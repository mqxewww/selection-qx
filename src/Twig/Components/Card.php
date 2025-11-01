<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
class Card
{
    public string $title = '';
    public string $description = '';

    public function mount(): void
    {
    }
}
