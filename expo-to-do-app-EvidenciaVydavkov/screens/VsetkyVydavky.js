import { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ZobrazenieVydavkov from "../components/ZobrazenieVydavkov";
import VyhladavanieVydavkov from "../components/VyhladavanieVydavkov";
import { VydavkyContext } from "../store/vydavky-context";
import { GlobalStyles } from "../constant/styles";

export default function VsetkyVydavky() {
  const vydavkyCtx = useContext(VydavkyContext);
  const [filteredVydavky, setFilteredVydavky] = useState(vydavkyCtx.vydavky);

  useEffect(() => {
    setFilteredVydavky(vydavkyCtx.vydavky);
  }, [vydavkyCtx.vydavky]);

  return (
    <View style={styles.container}>
      <VyhladavanieVydavkov
        vydavky={vydavkyCtx.vydavky}
        onFilteredChange={setFilteredVydavky}
      />

      <ZobrazenieVydavkov
        vydavky={filteredVydavky}
        pocetDniVydavkov="Zobrazenie všetkých dní"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 12,
  },
});