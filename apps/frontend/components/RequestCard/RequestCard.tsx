import styles from './RequestCard.module.css';
import { RequestCardProps } from "../../types/RequestCardTyes";

const RequestCard = ({ headline, date, user }: RequestCardProps) => (
    <div className={styles.card}>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.date}>Date: {new Date(date * 1000).toLocaleDateString()}</p>
        <p className={styles.userName}>Submitted by: {user}</p>
    </div>
);

export default RequestCard;
