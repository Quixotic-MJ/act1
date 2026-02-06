import React, { useRef } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Animated,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Importing your assets
import aseanlogo from "../assets/ctu-images/aseanlogo.png";
import ctuLogo from "../assets/ctu-images/ctulogo.png";
import tuv from "../assets/ctu-images/tuv.png";
import signature from "../assets/ctu-images/signature.png";
import buildingPhoto from "../assets/ctu-images/building.png";
import idphoto from "../assets/ctu-images/pic1.jpeg";

interface Student {
  name: string;
  course: string;
  idNumber: string;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const IDCard: React.FC<{ student: Student }> = ({ student }) => {
  const hoverAnim = useRef(new Animated.Value(0)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(hoverAnim, {
      toValue,
      useNativeDriver: true,
      stiffness: 180,
      damping: 18,
      mass: 0.8,
    }).start();
  };

  const animatedStyle = {
    transform: [
      { perspective: 900 },
      {
        rotateX: hoverAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "-6deg"],
        }),
      },
      {
        rotateY: hoverAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "6deg"],
        }),
      },
      {
        scale: hoverAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ],
  } as ViewStyle;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onHoverIn={() => animateTo(1)}
        onHoverOut={() => animateTo(0)}
        onPressIn={() => animateTo(1)}
        onPressOut={() => animateTo(0)}
      >
        <AnimatedLinearGradient
          // Custom colors to match the CTU Yellow-to-Green transition
          colors={["#ffffff", "#ffed4f", "#61d865"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, animatedStyle]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoGroup}>
              <Image source={ctuLogo} style={styles.logo} />
              <Image source={aseanlogo} style={styles.logo} />
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.republicText}>
                Republic of the Philippines
              </Text>
              <Text style={styles.univName}>
                CEBU TECHNOLOGICAL UNIVERSITY
              </Text>
              <Text style={styles.address}>
                <Text style={styles.addressBold}>Main Campus: </Text>
                M.J. Cuenco Avenue corner R. Palma St. Cebu City,
              </Text>
            </View>
          </View>

          {/* Profile Image */}
          <View style={styles.imageFrame}>
            <Image source={idphoto} style={styles.profileImg} />
          </View>

          {/* Signature - Using your edited photo as the signature placeholder if needed */}
          <View style={styles.signatureArea}>
            {/* If you have a separate signature image, use it here */}
            <Image source={signature} style={styles.signature} />
          </View>

          {/* Student Info */}
          <View style={styles.infoSection}>
            <Text style={styles.studentName}>{student.name.toUpperCase()}</Text>
            <Text style={styles.courseCode}>{student.course}</Text>
            <View style={styles.underline} />
            <Text style={styles.label}>COURSE</Text>
          </View>
          <Text style={styles.idText}>
            ID No.: <Text style={styles.idNumber}>{student.idNumber}</Text>
          </Text>

          {/* Footer Section */}
          <View style={styles.footerContainer}>
            <Image source={buildingPhoto} style={styles.buildingOverlay} />
            <View style={styles.isoBadgeWrapper}>
              <Image source={tuv} style={styles.isoMockup} />
            </View>
          </View>
        </AnimatedLinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  card: {
    width: 350,
    height: 650,
    borderRadius: 25,
    padding: 15,
    overflow: "hidden", // Crucial for the building overlay
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 10,
  },
  logoGroup: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginLeft: 10,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginBottom: 5,
  },
  headerTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  republicText: {
    fontSize: 13,
    fontFamily: "Arial",
    color: "#000",
  },
  univName: {
    fontSize: 13,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: "#000",
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  address: {
    fontSize: 11,
    color: "#000",
    marginTop: 2,
  },
  addressBold: {
    fontWeight: "bold",
    fontSize: 13,
  },
  imageFrame: {
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "#000",
    marginTop: 5,
  },
  profileImg: {
    width: 190,
    height: 210,
    resizeMode: "cover",
  },
  signatureArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  signature: {
    marginTop: 5,
    height: 50,
    resizeMode: "contain",
  },
  infoSection: {
    alignItems: "center",
    marginTop: 5,
  },
  studentName: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "900",
    color: "#000",
    letterSpacing: 0.2,
  },
  underline: {
    height: 2.5,
    backgroundColor: "#000",
    width: "60%",
    marginVertical: 4,
  },
  courseCode: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "700",
    color: "#000",
  },
  label: {
    fontSize: 11,
    color: "#333",
  },
  idText: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 100,
  },
  idNumber: {
    fontWeight: "700",
    fontFamily: "Arial",
  },
  footerContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
  },
  buildingOverlay: {
    position: "absolute",
    left: -15,
    right: -20,
    bottom: -25,
    height: 100,
    width: 350,
    resizeMode: "cover",
  },
  isoBadgeWrapper: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
  },
  isoMockup: {
    width: 120,
    height: 60,
    resizeMode: "contain",
  },
});

export default function App() {
  const sampleStudent = {
    name: "John Mark P. Magdasal",
    course: "BSIT",
    idNumber: "1351124",
  };

  return <IDCard student={sampleStudent} />;
}
