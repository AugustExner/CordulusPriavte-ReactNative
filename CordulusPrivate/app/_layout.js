import { Tabs,Stack } from "expo-router";

const RootLayout = () =>{

    return <Stack>
        <Tabs.Screen name = "index" options={{
        headerTitle: "Home Page",
        headerStyle: {
            backgroundColor: "lightblue"
        }
        }}/>
        <Tabs.Screen name ="addBed" options= {{
        headerTitle: "Add Garden Bed"
        }}/>
    </Stack>;
}

export default RootLayout;