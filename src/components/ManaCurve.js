import React, { lazy, Suspense } from "react";
import { Checkbox, Loader } from "semantic-ui-react";

const LazyManaCurveChart = lazy(() => import("./ManaCurveChart"));

export class ManaCurve extends React.Component {
	constructor(props) {
		super(props);
		this.state = { colorSafe: false };
	}
	handlColor = () => {
		this.setState(prevState => {
			return { colorSafe: !prevState.colorSafe };
		});
	};
	render() {
		return (
			<React.Fragment>
				<Checkbox
					checked={this.props.isManaVisible}
					onChange={() => this.props.setManaVisible(!this.props.isManaVisible)}
					toggle
					label="Krzywa many"
				/>
				{this.props.isManaVisible && (
					<Suspense
						fallback={
							<Loader style={{ marginTop: 75 }} active inline="centered" />
						}
					>
						<React.Fragment>
							<LazyManaCurveChart
								colorSafe={this.state.colorSafe}
								{...this.props}
							/>
							<Checkbox
								checked={this.state.colorSafe}
								onChange={() => this.handlColor()}
								label="Bezpieczne kolory"
							/>
						</React.Fragment>
					</Suspense>
				)}
			</React.Fragment>
		);
	}
}
