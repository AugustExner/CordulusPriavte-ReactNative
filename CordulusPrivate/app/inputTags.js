import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

const mainColor = "#3ca897";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: "",
        tagsArray: [],
      },
      tagsColor: mainColor,
      tagsText: "#F2F2F2",
    };
  }

  updateTagState = (state) => {
    this.setState({
      tags: state,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."
          label="Press comma & space to add a tag"
          labelStyle={{ color: "#F2F2F2" }}
          leftElement={
            <Icon
              name={"tag-multiple"}
              type={"material-community"}
              color={this.state.tagsText}
            />
          }
          leftElementContainerStyle={{ marginLeft: 3 }}
          containerStyle={{ width: Dimensions.get("window").width - 40 }}
          inputContainerStyle={[
            styles.textInput,
            { backgroundColor: this.state.tagsColor },
          ]}
          inputStyle={{ color: this.state.tagsText }}
          onFocus={() =>
            this.setState({ tagsColor: "#F2F2F2", tagsText: mainColor })
          }
          onBlur={() =>
            this.setState({ tagsColor: mainColor, tagsText: "#F2F2F2" })
          }
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={", "}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mainColor,
  },
  textInput: {
    height: 40,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: "hsl(159, 60%, 20%)",
  },
  tagText: {
    color: mainColor,
  },
});