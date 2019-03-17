import React, { useState, useMemo, useCallback } from "react";
import "semantic-ui-css/semantic.min.css";
import _ from "lodash";
import Fuse from "fuse.js";
import { Grid, Container, Divider, Header } from "semantic-ui-react";

import { CRAFTING_COST } from "../cards-rarity-config";
import { UsedMechanics } from "./UsedMechanics";
import { DeckStatistics } from "./DeckStatistics";
import { HeroPicker } from "./HeroPicker";
import { Deck } from "./Deck";
import { CardsFeed } from "./CardsFeed";
import { ManaCurve } from "./ManaCurve";
import { CardFilter } from "./CardFilter";
import cards from "../cards.json";

function App() {
	const [selectedHeroClass, setHeroClass] = useState("MAGE");
	const [searchText, setSearchText] = useState("hodowca");
	const [highlightMechanic, setHighlightMechanic] = useState("");
	const [deck, setDeck] = useState({ cards: [], quantity: {} });
	const [isManaVisible, setManaVisible] = useState(false);
	const [cardsTypeFilter, setCardsTypeFilter] = useState("ALL");

	const availableCards = useMemo(() => {
		console.log("availableCards");
		return selectedHeroClass
			? _.filter(
					cards,
					c => c.cardClass === selectedHeroClass || c.cardClass === "NEUTRAL"
			  )
			: [];
	}, [selectedHeroClass]);

	const cardFilteredByType = useMemo(() => {
		console.log("cardFilteredByType");
		return cardsTypeFilter !== "ALL"
			? _.filter(availableCards, c => c.type === cardsTypeFilter)
			: availableCards;
	}, [cardsTypeFilter, availableCards]);

	const fuse = new Fuse(cardFilteredByType, {
		keys: [
			{
				name: "text",
				weight: 0.3
			},
			{
				name: "name",
				weight: 0.7
			}
		],
		threshold: 0.3
	});
	const cardsInFeed = useMemo(() => {
		console.log("cardsInFeed");
		return searchText.length > 0 ? fuse.search(searchText) : cardFilteredByType;
	}, [searchText, cardFilteredByType]);

	const totalPackCost = deck.cards.reduce(
		(a, v) => a + CRAFTING_COST[v.rarity] * deck.quantity[v.id],
		0
	);
	const usedMechanics = deck.cards
		.reduce(
			(a, v) => (deck.quantity[v.id] === 2 ? a.concat([v, v]) : a.concat([v])),
			[]
		)
		.reduce((a, v) => (v.mechanics ? a.concat(v.mechanics) : a), [])
		.reduce((a, v) => Object.assign(a, { [v]: (a[v] || 0) + 1 }), {});

	const cardCount = deck.cards.reduce((a, v) => a + 1 * deck.quantity[v.id], 0);

	const canAddCard = card => {
		if (
			(deck.quantity[card.id] === 1 && card.rarity === "LEGENDARY") ||
			deck.quantity[card.id] === 2 ||
			cardCount === 30
		) {
			return false;
		}
		return true;
	};
	const addToDeck = useCallback(
		card => {
			console.log("useCallback");

			if (!canAddCard(card)) {
				return;
			}
			const quantity = deck.quantity[card.id]
				? Object.assign(deck.quantity, { [card.id]: 2 })
				: Object.assign(deck.quantity, { [card.id]: 1 });
			const cards = _.filter(availableCards, c => quantity[c.id]).sort(
				(a, b) => a.cost - b.cost
			);
			setDeck({ cards, quantity });
		},
		[availableCards, deck.quantity]
	);

	const removeFromDeck = id => {
		const quantity =
			deck.quantity[id] === 2
				? Object.assign(deck.quantity, { [id]: 1 })
				: _.omit(deck.quantity, [id]);
		const cards = _.filter(availableCards, c => quantity[c.id]).sort(
			(a, b) => a.cost - b.cost
		);
		setDeck({ cards, quantity });
	};

	return (
		<Container>
			<Divider hidden />
			{!selectedHeroClass ? (
				<HeroPicker setHeroClass={setHeroClass} />
			) : (
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Header dividing size="large">
								Klasa: {selectedHeroClass}
							</Header>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<CardFilter
								searchText={searchText}
								setSearchText={setSearchText}
								cardsTypeFilter={cardsTypeFilter}
								setCardsTypeFilter={setCardsTypeFilter}
							/>
							<Divider hidden />
							<CardsFeed
								deck={deck}
								cardsInFeed={cardsInFeed}
								addToDeck={addToDeck}
							/>
						</Grid.Column>
						<Grid.Column width={8}>
							<ManaCurve
								isManaVisible={isManaVisible}
								setManaVisible={setManaVisible}
								deck={deck}
							/>
							<Deck
								deck={deck}
								highlightMechanic={highlightMechanic}
								cardsTypeFilter={cardsTypeFilter}
								removeFromDeck={removeFromDeck}
							/>
							<DeckStatistics
								totalPackCost={totalPackCost}
								cardCount={cardCount}
							/>
							<UsedMechanics
								setHighlightMechanic={setHighlightMechanic}
								usedMechanics={usedMechanics}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)}
		</Container>
	);
}

export default App;
