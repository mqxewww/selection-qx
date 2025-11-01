<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CoursesController extends AbstractController
{
    #[Route('/courses', name: 'app_courses_index')]
    public function index(): Response
    {
        $courses = [
            [
                'id' => 1,
                'image_url' => "https://picsum.photos/800/400",
                'title' => 'BTS Services Informatiques aux Organisations (SIO)',
                'description' => "Diplôme niveau BAC+2 dans le domaine de l'informatique.",
                'applications_count' => 3
            ],
            [
                'id' => 2,
                'image_url' => "https://picsum.photos/800/400",
                'title' => "Bachelor Concepteur Développeur d'Applications",
                'description' => "Diplôme niveau BAC+3 dans le domaine de l'informatique.",
                'applications_count' => 8
            ],
            [
                'id' => 3,
                'image_url' => "https://picsum.photos/800/400",
                'title' => 'Master of Science Data/IA',
                'description' => "Diplôme niveau BAC+5 dans le domaine de l'informatique.",
                'applications_count' => 12
            ],
            [
                'id' => 4,
                'image_url' => "https://picsum.photos/800/400",
                'title' => 'BAC STI2D',
                'description' => "Baccalauréat technologique.",
                'applications_count' => 0
            ],
            [
                'id' => 5,
                'image_url' => "https://picsum.photos/800/400",
                'title' => 'Bachelor Mathématiques',
                'description' => "Diplôme niveau BAC+3 en mathématiques fondamentales et appliquées.",
                'applications_count' => 7
            ]
        ];

        return $this->render('courses/index.html.twig', ['courses' => $courses]);
    }
}
