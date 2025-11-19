<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints;

class CourseUpdateDto
{
    #[Constraints\NotBlank]
    #[Constraints\Date]
    public ?string $periodStart = null;

    #[Constraints\NotBlank]
    #[Constraints\Date]
    public ?string $periodEnd = null;

    #[Constraints\NotBlank]
    #[Constraints\Positive]
    public ?int $capacity = null;
}
