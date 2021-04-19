import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaGithub } from "react-icons/fa";

import "./styles.css";
import { IssueItem } from "../../components/IssueItem";

interface RepositoryParams {
  owner: string;
  repo: string;
}

interface RepositoryData {
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  owner: {
    avatarUrl: string;
  };
}

interface RepositoryResponseProps {
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    avatar_url: string;
  };
  message?: string;
}

interface Issue {
  title: string;
  url: string;
  owner: {
    login: string;
  };
}

type IssueResponseProps = {
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}[];

export function Repository() {
  const [repository, setRepository] = useState<RepositoryData>({
    description: "",
    forks: 0,
    openIssues: 0,
    owner: {
      avatarUrl: ""
    },
    stars: 0
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoadingRepository, setIsLoadingRepository] = useState<boolean>(
    false
  );
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(false);
  const { owner, repo } = useParams<RepositoryParams>();

  useEffect(() => {
    setIsLoadingRepository(true);

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(response => response.json())
      .then((data: RepositoryResponseProps) => {
        const {
          message,
          description,
          forks_count,
          open_issues_count,
          owner,
          stargazers_count
        } = data;

        if (message) {
          return alert(message);
        }

        setRepository({
          description,
          forks: forks_count,
          openIssues: open_issues_count,
          owner: {
            avatarUrl: owner.avatar_url
          },
          stars: stargazers_count
        });
      })
      .catch(() =>
        alert("Você provavelmente ultrapassou o limite de requisições.")
      )
      .finally(() => setIsLoadingRepository(false));
  }, [owner, repo]);

  useEffect(() => {
    setIsLoadingIssues(true);

    fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
      .then(response => response.json())
      .then((data: IssueResponseProps) => {
        const newIssues: Issue[] = data.map(issue => ({
          owner: {
            login: issue.user.login
          },
          title: issue.title,
          url: issue.html_url
        }));

        setIssues(newIssues);
      })
      .catch(() =>
        alert("Você provavelmente ultrapassou o limite de requisições.")
      )
      .finally(() => setIsLoadingIssues(false));
  }, [owner, repo]);

  return (
    <div className="repository-page">
      {isLoadingRepository ? (
        <div className="loading">
          <FaGithub className="loading-icon" size={32} color="#3a3a3a" />
        </div>
      ) : (
        <>
          <div className="profile-data">
            <img src={repository.owner.avatarUrl} alt={owner} />
            <div className="data-column">
              <strong>
                {owner}/{repo}
              </strong>
              <span>{repository.description}</span>
            </div>
          </div>
          <div className="repo-data">
            <ul>
              <li>
                <strong>{repository.stars}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{repository.forks}</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>{repository.openIssues}</strong>
                <span>Issues abertas</span>
              </li>
            </ul>
          </div>
          <div className="issues-list">
            <ul>
              {isLoadingIssues ? (
                <div className="loading">
                  <FaGithub
                    className="loading-icon"
                    size={32}
                    color="#3a3a3a"
                  />
                </div>
              ) : (
                issues.map(issue => (
                  <IssueItem
                    key={issue.url}
                    title={issue.title}
                    url={issue.url}
                    user={issue.owner.login}
                  />
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
