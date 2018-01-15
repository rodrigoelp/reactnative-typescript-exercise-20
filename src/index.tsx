import * as React from "react";
import { AppRegistry, View, Text, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";

/** 
 * Defining all the colours used by the application.
*/
enum Colors {
    Foreground = "white",
    FirstBox = "#5c97ea",
    FirstBoxSeparator = "#548ad5",
    SecondBox = "#fdac2b",
    SecondBoxSeparator = "#e69d27",
    ThirdBox = "#5cb0ad",
    ThirdBoxSeparator = "#4c918e",
}

/**
 * Enumeration to track the section to expand or collapse.
*/
enum Section {
    None,
    Top,
    Mid,
    Bottom
}

/**
 * Application styles.
*/
const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, alignContent: "center", justifyContent: "center" },
    title: { fontWeight: "bold", fontSize: 24, color: Colors.Foreground },
    box: { minHeight: 100 }, // Notice it does not define flex
    sectionBox: { flexGrow: 1, minHeight: 100 }, // notice it does not define flex.
    topSectionBox: { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    bottomSectionBox: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
    firstBox: { backgroundColor: Colors.FirstBoxSeparator },
    secondBox: { backgroundColor: Colors.SecondBoxSeparator },
    thirdBox: { backgroundColor: Colors.ThirdBoxSeparator },
    firstInnerBox: { backgroundColor: Colors.FirstBox, marginBottom: 10, padding: 10 },
    secondInnerBox: { backgroundColor: Colors.SecondBox, marginBottom: 10, padding: 10 },
    thirdInnerBox: { backgroundColor: Colors.ThirdBox, marginBottom: 10, padding: 10 },
});

// This is just a type to define the property I expect in the App component.
interface AppState {
    expandedSection: Section;
}

/** 
 * Component expanding/collapsing sections as displayed by it.
*/
class App extends React.PureComponent<{}, AppState> {

    // Properties used to generate the animation
    private _topFlexValue: Animated.Value;
    private _middleFlexValue: Animated.Value;
    private _bottomFlexValue: Animated.Value;

    constructor(props: any) {
        super(props);

        this.state = { expandedSection: Section.None };

        // setting the initial value for each animation property.
        this._topFlexValue = new Animated.Value(0);
        this._middleFlexValue = new Animated.Value(0);
        this._bottomFlexValue = new Animated.Value(0);

        // generating the performant binding call to a method.
        this.selectedSection = this.selectedSection.bind(this);
    }

    public render() {
        const config = { inputRange: [0, 1], outputRange: [0, 1] };
        // generating the observer that reacts to changes of the animation properties.
        const topValue = this._topFlexValue.interpolate(config);
        const midValue = this._middleFlexValue.interpolate(config);
        const bottomValue = this._bottomFlexValue.interpolate(config);
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.selectedSection(Section.Top)}>
                    <Animated.View style={[styles.box, styles.topSectionBox, styles.firstBox, { flex: topValue }]}>
                        <View style={[styles.sectionBox, styles.topSectionBox, styles.firstInnerBox]}>
                            <Text style={styles.title}>Section 1</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectedSection(Section.Mid)}>
                    <Animated.View style={[styles.box, styles.secondBox, { flex: midValue }]}>
                        <View style={[styles.sectionBox, styles.secondInnerBox]}>
                            <Text style={styles.title}>Section 2</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectedSection(Section.Bottom)}>
                    <Animated.View style={[styles.box, styles.bottomSectionBox, styles.thirdBox, { flex: bottomValue }]}>
                        <View style={[styles.sectionBox, styles.bottomSectionBox, styles.thirdInnerBox]}>
                            <Text style={styles.title}>Section 3</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    /**
     * Either selects or unselects a section based on the which elements was tapped on.
     * @param section Section to expand or collapse
     */
    private selectedSection(section: Section) {
        let toTop = 0, toMid = 0, toBottom = 0;
        if (this.state.expandedSection !== section) {
            switch (section) {
                case Section.Top: toTop = 1; break;
                case Section.Mid: toMid = 1; break;
                default: toBottom = 1; break;
            }
        } else {
            section = Section.None;
        }
        // Once we know where we are going to go, all we need is to animate
        // in parallel all the boxes. Those that are already on 0 will not change.
        Animated.parallel([
            Animated.timing(this._topFlexValue, { toValue: toTop, duration: 500 }),
            Animated.timing(this._middleFlexValue, { toValue: toMid, duration: 500 }),
            Animated.timing(this._bottomFlexValue, { toValue: toBottom, duration: 500 }),
        ]).start(
            () => {
                this.setState({ ...this.state, expandedSection: section });
            });
    }
}

AppRegistry.registerComponent('animateflex', () => App);