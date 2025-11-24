<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CriteriaCreateDto;
use App\Dto\CriteriaUpdateDto;
use App\Dto\CriterionMarkCreateDto;
use App\Dto\CriterionMarkUpdateDto;
use App\Entity\Criteria;
use App\Entity\CriterionMark;
use App\Repository\CourseRepository;
use App\Repository\CriteriaRepository;
use App\Repository\CriterionMarkRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CriteriaController extends AbstractController
{
    #[Route('/api/criteria', methods: ['POST'])]
    public function create(
        Request $request,
        ValidatorInterface $validator,
        CourseRepository $courseRepository,
        EntityManagerInterface $em,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $dto = new CriteriaCreateDto();

        $dto->title = $data['title'];
        $dto->courseId = $data['courseId'];

        $dto->criterionMarks = array_map(function ($item) {
            $mark = new CriterionMarkCreateDto();

            $mark->label = $item['label'];
            $mark->mark = $item['mark'];

            return $mark;
        }, $data['criterionMarks'] ?? []);

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse(['errors' => (string)$errors], 400);
        }

        $course = $courseRepository->find($dto->courseId);

        if (!$course || !is_null($course->getDeletedAt())) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $criteria = new Criteria();

        $criteria->setTitle($dto->title);
        $criteria->setCourse($course);
        $criteria->setCreatedAt(new DateTime());

        foreach ($dto->criterionMarks as $itemDto) {
            $mark = new CriterionMark();

            $mark->setLabel($itemDto->label);
            $mark->setMark($itemDto->mark);
            $mark->setCriterion($criteria);
            $mark->setCreatedAt(new DateTime());

            $em->persist($mark);
        }

        $em->persist($criteria);
        $em->flush();

        return new JsonResponse([]);
    }

    #[Route('/api/criteria/{id}', methods: ['PATCH'])]
    public function updateById(
        int $id,
        Request $request,
        ValidatorInterface $validator,
        CriteriaRepository $criteriaRepository,
        CriterionMarkRepository $criterionMarkRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $criteria = $criteriaRepository->find($id);

        if (!$criteria || !is_null($criteria->getDeletedAt())) {
            return new JsonResponse(['error' => 'Criteria not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $dto = new CriteriaUpdateDto();

        $dto->title = $data['title'];

        $dto->criterionMarks = array_map(function ($item) {
            $mark = new CriterionMarkUpdateDto();

            $mark->id = $item['id'] ?? null;
            $mark->label = $item['label'];
            $mark->mark = $item['mark'];
            $mark->delete = $item['delete'];

            return $mark;
        }, $data['criterionMarks'] ?? []);

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse(['errors' => (string)$errors], 400);
        }

        $criteria->setTitle($dto->title);

        foreach ($dto->criterionMarks as $itemDto) {
            if (is_null($itemDto->id)) {
                $mark = new CriterionMark();

                $mark->setLabel($itemDto->label);
                $mark->setMark($itemDto->mark);
                $mark->setCriterion($criteria);
                $mark->setCreatedAt(new DateTime());

                $em->persist($mark);

                continue;
            }

            $mark = $criterionMarkRepository->find($itemDto->id);

            if ($itemDto->delete) {
                $mark->setDeletedAt(new DateTime());

                continue;
            }

            $mark->setLabel($itemDto->label);
            $mark->setMark($itemDto->mark);
        }

        $em->flush();

        return new JsonResponse([]);
    }

    #[Route('/api/criteria/{id}', methods: ['DELETE'])]
    public function deleteById(
        int $id,
        CriteriaRepository $criteriaRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $criteria = $criteriaRepository->find($id);

        if (!$criteria || !is_null($criteria->getDeletedAt())) {
            return new JsonResponse(['error' => 'Course not found'], 404);
        }

        $criteria->setDeletedAt(new DateTime());

        foreach ($criteria->getCriterionMarks() as $mark) {
            $mark->setDeletedAt(new DateTime());
        }

        $em->flush();

        return new JsonResponse([]);
    }
}
