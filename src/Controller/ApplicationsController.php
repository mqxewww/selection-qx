<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApplicationsController extends AbstractController
{
    #[Route('/applications', name: 'app_applications_index')]
    public function index(): Response
    {
        return $this->render('applications/index.html.twig');
    }
}
