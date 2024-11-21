import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const about = () => {
  return (
    <View style={styles.app}>
      <Text variant="titleLarge">About</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
       Test 3
      </Button>

      <Card style={styles.card}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles: any = StyleSheet.create({
  app: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
  },
});

export default about;
