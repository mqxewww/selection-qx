<?php

namespace App\Entity;

use App\Repository\CriteriaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CriteriaRepository::class)]
class Criteria
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 31)]
    private ?string $title = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $displayOrder = null;

    #[ORM\Column]
    private ?\DateTime $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $deletedAt = null;

    #[ORM\ManyToOne(inversedBy: 'criterias')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Course $course = null;

    /**
     * @var Collection<int, CriterionMark>
     */
    #[ORM\OneToMany(targetEntity: CriterionMark::class, mappedBy: 'criterion')]
    private Collection $criterionMarks;

    public function __construct()
    {
        $this->criterionMarks = new ArrayCollection();
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

    public function getDisplayOrder(): ?int
    {
        return $this->displayOrder;
    }

    public function setDisplayOrder(int $displayOrder): static
    {
        $this->displayOrder = $displayOrder;

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
    public function getCriterionMarks(): Collection
    {
        return $this->criterionMarks;
    }

    public function addCriterionMark(CriterionMark $criterionMark): static
    {
        if (!$this->criterionMarks->contains($criterionMark)) {
            $this->criterionMarks->add($criterionMark);
            $criterionMark->setCriterion($this);
        }

        return $this;
    }

    public function removeCriterionMark(CriterionMark $criterionMark): static
    {
        if ($this->criterionMarks->removeElement($criterionMark)) {
            // set the owning side to null (unless already changed)
            if ($criterionMark->getCriterion() === $this) {
                $criterionMark->setCriterion(null);
            }
        }

        return $this;
    }
}
