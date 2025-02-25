import type React from "react"
import styles from "./EmailList.module.css"

interface Email {
	address: string
	type: "gmail" | "outlook" | "other"
}

interface EmailListProps {
	emails: Email[]
	onDeleteEmail: (email: string) => void
}

const EmailList: React.FC<EmailListProps> = ({ emails, onDeleteEmail }) => {
	return (
		<div className={styles.emailListContainer}>
			<h2 className={styles.emailListTitle}>Correos vinculados</h2>
			<ul className={styles.emailList}>
				{emails.map((email) => (
					<li key={email.address} className={styles.emailItem}>
						<span className={styles.emailAddress}>{email.address}</span>
						<span className={styles.emailType}>{email.type}</span>
						<button
							className={styles.deleteButton}
							onClick={() => onDeleteEmail(email.address)}
						>
							Eliminar
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default EmailList
