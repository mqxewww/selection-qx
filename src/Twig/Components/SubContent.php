<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
class SubContent
{
    public string $title = '';
    public string $description = '';

    public function mount(): void
    {
    }
}
