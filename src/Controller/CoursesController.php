<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/courses')]
class CoursesController extends AbstractController
{
    public array $criteria = [
        [
            'title' => 'Comportement',
            'marks' => [
                [
                    'label' => 'Perturbateur',
                    'mark' => -2,
                ],
                [
                    'label' => 'Correct',
                    'mark' => 0,
                ],
                [
                    'label' => 'Exemplaire',
                    'mark' => 2,
                ]
            ]
        ],
        [
            'title' => 'Expériences',
            'marks' => [
                [
                    'label' => "N'a pas d'expériences",
                    'mark' => 0,
                ],
                [
                    'label' => "Possède de l'expérience",
                    'mark' => 2,
                ]
            ]
        ],
        [
            'title' => 'Compétences techniques',
            'marks' => [
                [
                    'label' => 'Débutant',
                    'mark' => 0,
                ],
                [
                    'label' => 'Correct',
                    'mark' => 1,
                ],
                [
                    'label' => 'Avancé',
                    'mark' => 2,
                ],
                [
                    'label' => 'Avancé++',
                    'mark' => 4,
                ]
            ]
        ]
    ];
    private array $courses = [
        [
            'id' => 1,
            'image_url' => "https://picsum.photos/800/400",
            'title' => 'BTS Services Informatiques aux Organisations (SIO)',
            'description' => "Diplôme niveau BAC+2 dans le domaine de l'informatique.",
            'period' => '01 octobre 2025 - 30 juin 2027',
            'applications_count' => 3,
            'capacity' => 30,
            'created_at' => '02/07/2025'
        ],
        [
            'id' => 2,
            'image_url' => "https://picsum.photos/800/400",
            'title' => "Bachelor Concepteur Développeur d'Applications",
            'description' => "Diplôme niveau BAC+3 dans le domaine de l'informatique.",
            'period' => '01 octobre 2025 - 30 juin 2027',
            'applications_count' => 8,
            'capacity' => 18,
            'created_at' => '02/07/2025'
        ],
        [
            'id' => 3,
            'image_url' => "https://picsum.photos/800/400",
            'title' => 'Master of Science Data/IA',
            'description' => "Diplôme niveau BAC+5 dans le domaine de l'informatique.",
            'period' => '01 octobre 2025 - 30 juin 2027',
            'applications_count' => 12,
            'capacity' => 40,
            'created_at' => '02/07/2025'
        ],
        [
            'id' => 4,
            'image_url' => "https://picsum.photos/800/400",
            'title' => 'BAC STI2D',
            'description' => "Baccalauréat technologique.",
            'period' => '01 octobre 2025 - 30 juin 2027',
            'applications_count' => 0,
            'capacity' => 27,
            'created_at' => '02/07/2025'
        ],
        [
            'id' => 5,
            'image_url' => "https://picsum.photos/800/400",
            'title' => 'Bachelor Mathématiques',
            'description' => "Diplôme niveau BAC+3 en mathématiques fondamentales et appliquées.",
            'period' => '01 octobre 2025 - 30 juin 2027',
            'applications_count' => 7,
            'capacity' => 12,
            'created_at' => '02/07/2025'
        ]
    ];

    #[Route('/', name: 'app_courses_index')]
    public function index(): Response
    {
        return $this->render('courses/index.html.twig', ['courses' => $this->courses]);
    }

    #[Route('/{id}', name: 'app_courses_show')]
    public function show(int $id): Response
    {
        $course = $this->courses[$id - 1] ?? null;

        if (!$course) {
            throw $this->createNotFoundException('Formation non trouvée');
        }

        return $this->render('courses/show.html.twig', [
            'course' => $course,
            'criteria' => $this->criteria
        ]);
    }
}
