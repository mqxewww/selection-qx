<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Criterion;
use Doctrine\ORM\EntityManagerInterface;

readonly class CriterionDeleteProcessor implements ProcessorInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (!$data instanceof Criterion) {
            return;
        }

        $now = new \DateTime();

        $data->setDeletedAt($now);

        $this->entityManager->flush();
    }
}
