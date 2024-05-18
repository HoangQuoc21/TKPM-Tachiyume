import { StyleSheet } from "react-native";
import { spacing, typography, color } from "../../theme";

export default StyleSheet.create({
    ROOT:{
        flex:1,
        paddingHorizontal: spacing[4]
    },
    LOGO:{
        justifyContent:"center",
    },
    HEADER:{
        flex:4,
    },
    BODY:{
        flex:6,
    },

    SECTION_CONTAINER:{
        padding: spacing[1],
        marginBottom: spacing[4],
    },
    SECTION_TITLE:{
        ...typography.titleLarge,
        fontWeight:"bold",
    },
    ITEM_CONATINER:{
        padding: spacing[1],
        flexDirection:"row",
        alignItems:"center",
        gap: spacing[2],
    },
    ITEM_TEXT:{
        ...typography.labelLarge,
        textDecorationLine:"underline",
    },
})