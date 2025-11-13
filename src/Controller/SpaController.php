<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SpaController extends AbstractController
{
    #[Route('/app/{route}', name: 'spa', requirements: ['route' => '.*'])]
    public function index(): Response
    {
        return $this->render('app/index.html.twig');
    }
}
