<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CourseUpdateDto;
use App\Repository\CourseRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CoursesController extends AbstractController
{
    #[Route('/api/courses', methods: ['GET'])]
    public function getCourses(CourseRepository $courseRepository): JsonResponse
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
    public function getCourseById(int $id, CourseRepository $courseRepository): JsonResponse
    {
        $course = $courseRepository->find($id);

        if (!$course) {
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
                    }, $criteria->getCriterionMarks()->toArray())
                ];
            }, $course->getCriterias()->toArray()),
        ];

        return new JsonResponse($data);
    }

    #[Route('/api/courses/{id}', methods: ['PATCH'])]
    public function update(
        int $id,
        Request $request,
        CourseRepository $courseRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $em
    ): JsonResponse {
        $course = $courseRepository->find($id);

        if (!$course) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $dto = new CourseUpdateDto();

        $dto->periodStart = $data['periodStart'] ?? null;
        $dto->periodEnd = $data['periodEnd'] ?? null;
        $dto->capacity = $data['capacity'] ?? null;

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse(['errors' => (string)$errors], 400);
        }

        $course->setPeriodStart(new DateTime($dto->periodStart));
        $course->setPeriodEnd(new DateTime($dto->periodEnd));
        $course->setCapacity($dto->capacity);

        $em->flush();

        return new JsonResponse([]);
    }
}
