import { StyleSheet } from "react-native";
import { spacing, typography } from "../../theme";

export default StyleSheet.create({
    ROOT:{
        flex:1,
    },
    HEADER:{
        flex: 1,
    },
    BODY:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing[8]
    },
    FOOTER:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: spacing[4]
    },
    TEXT:{
        ...typography.bodyLarge,
    },
    TITLE:{
        ...typography.displayLarge,
        fontWeight: 'bold',
    },
})