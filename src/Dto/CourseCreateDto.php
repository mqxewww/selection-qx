<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints;

class CourseCreateDto
{
    #[Constraints\NotBlank]
    public ?string $title = null;

    #[Constraints\NotBlank]
    public ?string $description = null;

    #[Constraints\NotBlank]
    #[Constraints\Positive]
    public ?int $capacity = null;

    #[Constraints\NotBlank]
    #[Constraints\Date]
    public ?string $periodStart = null;

    #[Constraints\NotBlank]
    #[Constraints\Date]
    public ?string $periodEnd = null;
}
