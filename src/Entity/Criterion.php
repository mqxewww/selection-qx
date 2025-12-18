<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CriterionRepository;
use App\State\CriterionDeleteProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CriterionRepository::class)]
#[ApiResource(
    operations: [
        new Post(denormalizationContext: ['groups' => ['criterion:write', 'criterion:create']]),
        new Patch(denormalizationContext: ['groups' => ['criterion:write']]),
        new Delete(processor: CriterionDeleteProcessor::class),
    ],
    denormalizationContext: ['groups' => ['criterion:write']],
    order: ['createdAt' => 'ASC']
)]
class Criterion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['criterion:write', 'course:item'])]
    private ?string $title = null;

    #[ORM\Column]
    private ?\DateTime $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $deletedAt = null;

    #[ORM\ManyToOne(inversedBy: 'criteria')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['criterion:create'])]
    private ?Course $course = null;

    /**
     * @var Collection<int, CriterionMark>
     */
    #[ORM\OneToMany(targetEntity: CriterionMark::class, mappedBy: 'criterion', cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['criterion:write', 'course:item'])]
    private Collection $marks;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->marks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDeletedAt(): ?\DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTime $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    public function getCourse(): ?Course
    {
        return $this->course;
    }

    public function setCourse(?Course $course): static
    {
        $this->course = $course;

        return $this;
    }

    /**
     * @return Collection<int, CriterionMark>
     */
    public function getMarks(): Collection
    {
        return $this->marks;
    }

    public function addMark(CriterionMark $mark): static
    {
        if (!$this->marks->contains($mark)) {
            $this->marks->add($mark);
            $mark->setCriterion($this);
        }

        return $this;
    }

    public function removeMark(CriterionMark $mark): static
    {
        $this->marks->removeElement($mark);

        return $this;
    }
}
