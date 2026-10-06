import {
  SiCplusplus,
  SiDart,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJsonwebtokens,
  SiMysql,
  SiReact,
  SiReactquery,
  SiRailway,
  SiRedux,
  SiRender,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { assetPath } from "../utils/assetPath";

// Brand icons referenced by name from skill.json ("si" field). Listed explicitly
// so only these icons end up in the bundle.
const brandIcons = {
  SiCplusplus,
  SiDart,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJsonwebtokens,
  SiMysql,
  SiReact,
  SiReactquery,
  SiRailway,
  SiRedux,
  SiRender,
  SiSupabase,
  SiVercel,
  FaJava,
};

// A skill has either an image file ("icon") or a brand icon name ("si").
const SkillIcon = ({ skill, className = "w-full h-full" }) => {
  const Brand = skill.si && brandIcons[skill.si];
  if (Brand) {
    return <Brand role="img" aria-label={skill.name} className={className} style={{ color: skill.iconColor }} />;
  }
  return <img src={assetPath(skill.icon)} alt={skill.name} className={`${className} object-contain`} />;
};

export default SkillIcon;
