<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\CourseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

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
                'periodStart' => $course->getPeriodStart()?->format('Y-m-d'),
                'periodEnd' => $course->getPeriodEnd()?->format('Y-m-d'),
            ];
        }, $courses);

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
}
