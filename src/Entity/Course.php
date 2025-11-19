<?php

namespace App\Entity;

use App\Repository\CourseRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 31)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $capacity = null;

    #[ORM\Column]
    private ?DateTime $periodStart = null;

    #[ORM\Column]
    private ?DateTime $periodEnd = null;

    #[ORM\Column]
    private ?DateTime $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?DateTime $deletedAt = null;

    /**
     * @var Collection<int, Criteria>
     */
    #[ORM\OneToMany(targetEntity: Criteria::class, mappedBy: 'course')]
    private Collection $criterias;

    public function __construct()
    {
        $this->criterias = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getPeriodStart(): ?DateTime
    {
        return $this->periodStart;
    }

    public function setPeriodStart(DateTime $periodStart): static
    {
        $this->periodStart = $periodStart;

        return $this;
    }

    public function getPeriodEnd(): ?DateTime
    {
        return $this->periodEnd;
    }

    public function setPeriodEnd(DateTime $periodEnd): static
    {
        $this->periodEnd = $periodEnd;

        return $this;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDeletedAt(): ?DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?DateTime $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * @return Collection<int, Criteria>
     */
    public function getCriterias(): Collection
    {
        return $this->criterias;
    }

    public function addCriteria(Criteria $criteria): static
    {
        if (!$this->criterias->contains($criteria)) {
            $this->criterias->add($criteria);
            $criteria->setCourse($this);
        }

        return $this;
    }

    public function removeCriteria(Criteria $criteria): static
    {
        if ($this->criterias->removeElement($criteria)) {
            // set the owning side to null (unless already changed)
            if ($criteria->getCourse() === $this) {
                $criteria->setCourse(null);
            }
        }

        return $this;
    }
}
