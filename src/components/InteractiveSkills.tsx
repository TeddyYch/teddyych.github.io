import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { skillCategories, type SkillCategory } from "@/data/skills";

const leftCategoryIds = ["programming", "backend", "security"];
const rightCategoryIds = ["frontend", "automation", "creative"];
const toneClasses: Record<SkillCategory["tone"], { card: string; core: string; connection: string }> = {
  blue: { card: "skill-tree-card--blue", core: "skill-core--blue", connection: "skill-connection--blue" },
  teal: { card: "skill-tree-card--teal", core: "skill-core--teal", connection: "skill-connection--teal" },
  green: { card: "skill-tree-card--green", core: "skill-core--green", connection: "skill-connection--green" },
  orange: { card: "skill-tree-card--orange", core: "skill-core--orange", connection: "skill-connection--orange" },
  purple: { card: "skill-tree-card--purple", core: "skill-core--purple", connection: "skill-connection--purple" },
  red: { card: "skill-tree-card--red", core: "skill-core--red", connection: "skill-connection--red" },
};

function CategoryButton({
  category,
  index,
  isSelected,
  controls,
  showInlineDetail = false,
  onSelect,
}: {
  category: SkillCategory;
  index: number;
  isSelected: boolean;
  controls?: string;
  showInlineDetail?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`skill-tree-card ${toneClasses[category.tone].card}`}
      aria-pressed={isSelected}
      aria-controls={controls}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <span className="skill-tree-card__topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="skill-tree-card__node" />
      </span>
      <span className="skill-tree-card__title">{category.title}</span>
      <span className="skill-tree-card__chips" role="list" aria-label={`${category.title} skills`}>
        {category.items.map((item) => <span key={item.name} role="listitem">{item.name}</span>)}
      </span>
      <span className="skill-tree-card__action">
        {isSelected ? "Evidence in view" : "View evidence"}
        <ArrowUpRight aria-hidden="true" />
      </span>

      {showInlineDetail && isSelected && (
        <span className="skill-tree-card__inline-detail" role="status" aria-live="polite">
          <span>{category.description}</span>
          <span className="skill-tree-card__inline-label">Evidence context</span>
          <span>{category.evidenceNote}</span>
        </span>
      )}
    </button>
  );
}

function CapabilityCore({ category, index, id, compact = false }: { category: SkillCategory; index: number; id: string; compact?: boolean }) {
  const representativeSkills = category.items.slice(0, 4);

  return (
    <section
      id={id}
      className={`skill-core ${toneClasses[category.tone].core}${compact ? " skill-core--compact" : ""}`}
      aria-labelledby={`${id}-title`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="skill-core__rings" aria-hidden="true"><i /><i /><i /></span>
      <div className="skill-core__content">
        <p className="skill-core__eyebrow"><span>{String(index + 1).padStart(2, "0")}</span> Selected capability</p>
        <h3 id={`${id}-title`}>{category.title}</h3>
        <p className="skill-core__summary">{category.description}</p>

        <div className="skill-core__tags" aria-label="Evidence tags">
          {category.evidenceTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="skill-core__evidence">
          <p>Evidence context</p>
          <p>{category.evidenceNote}</p>
        </div>

        <div className="skill-core__nodes" aria-label="Representative skills">
          {representativeSkills.map((item) => <span key={item.name}>{item.name}</span>)}
        </div>
      </div>
    </section>
  );
}

export default function InteractiveSkills() {
  const [selectedId, setSelectedId] = useState(skillCategories[0].id);
  const selectedIndex = Math.max(0, skillCategories.findIndex((category) => category.id === selectedId));
  const selected = skillCategories[selectedIndex];
  const leftCategories = leftCategoryIds.map((id) => skillCategories.find((category) => category.id === id) as SkillCategory);
  const rightCategories = rightCategoryIds.map((id) => skillCategories.find((category) => category.id === id) as SkillCategory);

  const renderButton = (category: SkillCategory, controls: string, showInlineDetail = false) => {
    const index = skillCategories.findIndex((item) => item.id === category.id);
    return (
      <CategoryButton
        key={category.id}
        category={category}
        index={index}
        isSelected={category.id === selected.id}
        controls={controls || undefined}
        showInlineDetail={showInlineDetail}
        onSelect={() => setSelectedId(category.id)}
      />
    );
  };

  return (
    <div className="interactive-skills" data-selected={selected.id}>
      <div className="skill-tree skill-tree__desktop" aria-label="Interactive technical skill tree">
        <svg className="skill-tree__connections" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
          {skillCategories.map((category) => {
            const side = leftCategoryIds.includes(category.id) ? "left" : "right";
            const row = (side === "left" ? leftCategoryIds : rightCategoryIds).indexOf(category.id);
            const y = 84 + (row * 176);
            const path = side === "left"
              ? `M 352 ${y} C 430 ${y}, 438 260, 505 260`
              : `M 848 ${y} C 770 ${y}, 762 260, 695 260`;
            return <path key={category.id} d={path} className={`skill-connection ${toneClasses[category.tone].connection}`} data-active={category.id === selected.id} />;
          })}
        </svg>

        <div className="skill-tree__column skill-tree__column--left">
          {leftCategories.map((category) => renderButton(category, "desktop-skill-core"))}
        </div>
        <CapabilityCore category={selected} index={selectedIndex} id="desktop-skill-core" />
        <div className="skill-tree__column skill-tree__column--right">
          {rightCategories.map((category) => renderButton(category, "desktop-skill-core"))}
        </div>
      </div>

      <div className="skill-tree__tablet" aria-label="Technical skill categories">
        <div className="skill-tree__tablet-grid">
          {skillCategories.slice(0, 2).map((category) => renderButton(category, "tablet-skill-core"))}
          <CapabilityCore category={selected} index={selectedIndex} id="tablet-skill-core" compact />
          {skillCategories.slice(2).map((category) => renderButton(category, "tablet-skill-core"))}
        </div>
      </div>

      <div className="skill-tree__mobile" aria-label="Technical skill categories">
        {skillCategories.map((category) => renderButton(category, "", true))}
      </div>
    </div>
  );
}
