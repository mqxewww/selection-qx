<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Course;
use Doctrine\ORM\EntityManagerInterface;

readonly class CourseDeleteProcessor implements ProcessorInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (!$data instanceof Course) {
            return;
        }

        $now = new \DateTime();

        $data->setDeletedAt($now);

        foreach ($data->getCriteria() as $criterion) {
            $criterion->setDeletedAt($now);
        }

        $this->entityManager->flush();
    }
}
