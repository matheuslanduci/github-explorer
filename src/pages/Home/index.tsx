import { ChangeEvent, FormEvent, useState } from "react";
import { RepositoryItem } from "../../components/RepositoryItem";

import { FaGithub } from "react-icons/fa";

import "./styles.css";

interface Repository {
  fullName: string;
  description: string;
  owner: {
    name: string;
    avatarUrl: string;
  };
}

interface RepositoriesResponseProps {
  items: {
    full_name: string;
    description: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  }[];
  errors?: {
    message: string;
  }[];
}

export function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topic] = useState<string>(() => {
    const generatedNumber = Math.floor(Math.random() * 5) + 1;

    switch (generatedNumber) {
      default:
      case 1:
        return "GraphQL";
      case 2:
        return "NestJS";
      case 3:
        return "NodeJS";
      case 4:
        return "React Native";
      case 5:
        return "Electron";
    }
  });
  const [repositories, setRepositories] = useState<Repository[]>([]);

  function fetchRepositories(q = searchValue) {
    setIsLoading(true);

    fetch(`https://api.github.com/search/repositories?q=${q}+in%3Aname`)
      .then(response => response.json())
      .then((data: RepositoriesResponseProps) => {
        const { items, errors } = data;

        if (errors) {
          return alert(errors[0].message);
        }

        const repos: Repository[] = items.map(item => ({
          fullName: item.full_name,
          description: item.description,
          owner: {
            name: item.owner.login,
            avatarUrl: item.owner.avatar_url
          }
        }));

        setRepositories(repos);
      })
      .catch(() =>
        alert("Você provavelmente ultrapassou o limite de requisições.")
      )
      .finally(() => setIsLoading(false));
  }

  function handleClickOnTopic() {
    setSearchValue(topic);

    fetchRepositories(topic);
  }

  function handleChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    fetchRepositories();
  }

  return (
    <div className="home-page">
      <strong>
        Explore repositórios
        <br /> no Github.
      </strong>
      <form onSubmit={handleSubmit} className="input">
        <input
          value={searchValue}
          onChange={handleChangeSearchValue}
          placeholder="Digite aqui"
        />
        <button type="submit">Pesquisar</button>
      </form>
      <div className="repository-list">
        <ul>
          {isLoading ? (
            <div className="loading">
              <FaGithub className="loading-icon" size={32} color="#3a3a3a" />
            </div>
          ) : repositories.length > 0 ? (
            repositories.map(repo => (
              <RepositoryItem
                key={repo.fullName}
                fullName={repo.fullName}
                description={repo.description}
                owner={repo.owner}
              />
            ))
          ) : (
            <span>
              Comece pesquisando! <br />
              Já tentou pesquisar por{" "}
              <i onClick={handleClickOnTopic}>{topic}</i>?
            </span>
          )}
        </ul>
      </div>
    </div>
  );
}
