import { FaChevronRight } from "react-icons/fa";

import "./styles.css";

interface IssueItemProps {
  url: string;
  title: string;
  user: string;
}

export function IssueItem(props: IssueItemProps) {
  const { title, url, user } = props;

  return (
    <a className="link" href={url} target="_blank" rel="noopener noreferrer">
      <li className="issue-item">
        <div className="issue-data">
          <strong>{title}</strong>
          <span>{user}</span>
        </div>
        <FaChevronRight size={16} color="#C9C9D4" />
      </li>
    </a>
  );
}
