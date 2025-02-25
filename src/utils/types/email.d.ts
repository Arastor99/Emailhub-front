interface EmailAddress {
	name: string
	address: string
}

interface Sender {
	emailAddress: EmailAddress
}

interface From {
	emailAddress: EmailAddress
}

interface ToRecipient {
	emailAddress: EmailAddress
}

interface CcRecipient {
	emailAddress: EmailAddress
}

interface BccRecipient {
	emailAddress: EmailAddress
}

interface Flag {
	flagStatus: string
}

interface Body {
	contentType: string
	content: string
}

interface Message {
	"@odata.etag": string
	id: string
	createdDateTime: string
	lastModifiedDateTime: string
	changeKey: string
	categories: string[]
	receivedDateTime: string
	sentDateTime: string
	hasAttachments: boolean
	internetMessageId: string
	subject: string
	bodyPreview: string
	importance: string
	parentFolderId: string
	conversationId: string
	conversationIndex: string
	isDeliveryReceiptRequested: boolean | null
	isReadReceiptRequested: boolean
	isRead: boolean
	isDraft: boolean
	webLink: string
	inferenceClassification: string
	body: Body
	sender: Sender
	from: From
	toRecipients: ToRecipient[]
	ccRecipients: CcRecipient[]
	bccRecipients: BccRecipient[]
	replyTo: any[] // Puedes definir una interfaz más específica si es necesario
	flag: Flag
}

export interface MessagesResponse {
	"@odata.context": string
	value: Message[]
	"@odata.nextLink": string
}
