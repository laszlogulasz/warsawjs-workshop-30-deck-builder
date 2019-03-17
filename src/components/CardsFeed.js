import React from "react";
import { Card } from "semantic-ui-react";
import { SingleCard } from "./SingleCard";
export class CardsFeed extends React.Component {
	render() {
		return (
			<Card.Group>
				{this.props.cardsInFeed.map(card => (
					<SingleCard
						key={card.id}
						card={card}
						deck={this.props.deck}
						cardsInFeed={this.props.cardsInFeed}
						quantity={this.props.deck.quantity[card.id]}
						addToDeck={this.props.addToDeck}
					/>
				))}
			</Card.Group>
		);
	}
}
