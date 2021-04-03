import React from "react";
import "./styles.css";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

export interface Teacher {
  id: number;
  image_url: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  async function createNewConnection() {
    await api.post("connections", {
      user_id: teacher.id,
    });
  }

  return (
    <>
      <article className="teacher-item">
        <header>
          <img src={teacher.image_url} alt={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
          <p>
            Preço/hora
            <strong>R$ {teacher.cost}</strong>
          </p>
          <a
            onClick={createNewConnection}
            target="_blank"
            href={`https:/wa.me/${teacher.whatsapp}`}
          >
            <img src={whatsappIcon} alt="whatsapp-icon" />
            Entrar em contato
          </a>
        </footer>
      </article>
    </>
  );
};

export default TeacherItem;
