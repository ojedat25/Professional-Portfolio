import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

/** Mobile-specific layout can diverge here; currently mirrors ProjectCard. */
export default function MobileProjectCard(props: ProjectCardProps) {
  return <ProjectCard {...props} />;
}
