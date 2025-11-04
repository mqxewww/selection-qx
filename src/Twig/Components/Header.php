<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
class Header
{
    public array $menuItems = [];
    public string $currentRoute = '';

    public function mount(): void
    {
        if (empty($this->menuItems)) {
            $this->menuItems = [
                [
                    'label' => 'Formations',
                    'icon' => 'ph:graduation-cap',
                    'url' => '/courses',
                    'route' => 'app_courses_index',
                    'route_prefix' => 'app_courses',
                ],
                [
                    'label' => 'Candidatures',
                    'icon' => 'ph:file-text',
                    'url' => '/applications',
                    'route' => 'app_applications_index',
                    'route_prefix' => 'app_applications',
                ],
            ];
        }
    }
}
