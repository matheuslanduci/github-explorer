import { Link } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";

import "./styles.css";

interface RepositoryItemProps {
  fullName: string;
  description: string;
  owner: {
    name: string;
    avatarUrl: string;
  };
}

export function RepositoryItem(props: RepositoryItemProps) {
  const { fullName, description, owner } = props;

  return (
    <Link to={fullName}>
      <li className="repository-item">
        <img src={owner.avatarUrl} alt={owner.name} />
        <div>
          <strong>{fullName}</strong>
          <span>{description}</span>
        </div>
        <FaChevronRight className="right-arrow" size={20} color="#C9C9D4" />
      </li>
    </Link>
  );
}
