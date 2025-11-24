<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CourseCreateDto;
use App\Dto\CourseUpdateDto;
use App\Entity\Course;
use App\Repository\CourseRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CourseController extends AbstractController
{
    #[Route('/api/courses', methods: ['GET'])]
    public function getAll(CourseRepository $courseRepository): JsonResponse
    {
        $courses = $courseRepository->findAll();

        $data = array_map(function ($course) {
            return [
                'id' => $course->getId(),
                'title' => $course->getTitle(),
                'description' => $course->getDescription(),
                'capacity' => $course->getCapacity(),
                'periodStart' => $course->getPeriodStart()?->format('Y'),
                'periodEnd' => $course->getPeriodEnd()?->format('Y'),
                'applicationsCount' => rand(2, 10),
            ];
        },
            array_filter($courses, fn($course) => is_null($course->getDeletedAt()))
        );

        return new JsonResponse($data);
    }

    #[Route('/api/courses/{id}', methods: ['GET'])]
    public function getById(int $id, CourseRepository $courseRepository): JsonResponse
    {
        $course = $courseRepository->find($id);

        if (!$course || !is_null($course->getDeletedAt())) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $data = [
            'id' => $course->getId(),
            'title' => $course->getTitle(),
            'description' => $course->getDescription(),
            'capacity' => $course->getCapacity(),
            'periodStart' => $course->getPeriodStart()->format('Y-m-d'),
            'periodEnd' => $course->getPeriodEnd()->format('Y-m-d'),
            'createdAt' => $course->getCreatedAt()->format('Y-m-d'),
            'applicationsCount' => rand(2, 10),
            'criterias' => array_map(function ($criteria) {
                return [
                    'id' => $criteria->getId(),
                    'title' => $criteria->getTitle(),
                    'marks' => array_map(function ($mark) {
                        return [
                            'id' => $mark->getId(),
                            'label' => $mark->getLabel(),
                            'mark' => $mark->getMark()
                        ];
                    },
                        array_values(
                            array_filter(
                                $criteria->getCriterionMarks()->toArray(),
                                fn($mark) => is_null($mark->getDeletedAt())
                            )
                        )),
                ];
            },
                array_values(
                    array_filter($course->getCriterias()->toArray(), fn($criteria) => is_null($criteria->getDeletedAt())
                    )
                )),
        ];

        return new JsonResponse($data);
    }

    #[Route('/api/courses', methods: ['POST'])]
    public function create(
        Request $request,
        ValidatorInterface $validator,
        EntityManagerInterface $em,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $dto = new CourseCreateDto();

        $dto->title = $data['title'];
        $dto->description = $data['description'];
        $dto->capacity = $data['capacity'];
        $dto->periodStart = $data['periodStart'];
        $dto->periodEnd = $data['periodEnd'];

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse(['errors' => (string)$errors], 400);
        }

        $course = new Course();

        $course->setTitle($data['title']);
        $course->setDescription($data['description']);
        $course->setCapacity($data['capacity']);
        $course->setPeriodStart(new DateTime($dto->periodStart));
        $course->setPeriodEnd(new DateTime($dto->periodEnd));
        $course->setCreatedAt(new DateTime());

        $em->persist($course);
        $em->flush();

        return new JsonResponse([]);
    }

    #[Route('/api/courses/{id}', methods: ['PATCH'])]
    public function updateById(
        int $id,
        Request $request,
        CourseRepository $courseRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $em
    ): JsonResponse {
        $course = $courseRepository->find($id);

        if (!$course || !is_null($course->getDeletedAt())) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $dto = new CourseUpdateDto();

        $dto->capacity = $data['capacity'] ?? null;
        $dto->periodStart = $data['periodStart'] ?? null;
        $dto->periodEnd = $data['periodEnd'] ?? null;

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse(['errors' => (string)$errors], 400);
        }

        $course->setCapacity($dto->capacity);
        $course->setPeriodStart(new DateTime($dto->periodStart));
        $course->setPeriodEnd(new DateTime($dto->periodEnd));

        $em->flush();

        return new JsonResponse([]);
    }

    #[Route('/api/courses/{id}', methods: ['DELETE'])]
    public function deleteById(
        int $id,
        CourseRepository $courseRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $course = $courseRepository->find($id);

        if (!$course || !is_null($course->getDeletedAt())) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $course->setDeletedAt(new DateTime());

        foreach ($course->getCriterias() as $criteria) {
            $criteria->setDeletedAt(new DateTime());

            foreach ($criteria->getCriterionMarks() as $mark) {
                $mark->setDeletedAt(new DateTime());
            }
        }

        $em->flush();

        return new JsonResponse([]);
    }
}
