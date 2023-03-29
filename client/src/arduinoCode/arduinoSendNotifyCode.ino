#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Replace with your network credentials
const char* ssid = "nikki";
const char* password = "12345678";
int button=D0;
void setup() {
  Serial.begin(115200);
pinMode(button,INPUT);
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}


void loop() {
int value=digitalRead(button);
  // Check if NodeMCU is connected to the WiFi network
if(value==1){
    if (WiFi.status() == WL_CONNECTED) {
    // Create a WiFi client object
    WiFiClient wifiClient;
    // Make HTTP GET request
    HTTPClient http;


//char url[100];
//sprintf(url, "http://192.168.253.153:5000/getVehicleStatus?accident=true&rash=false&location=%s,%s", dtostrf(latitude, 7, 6, url), dtostrf(longitude, 8, 6, url));
    const char* url = "http://192.168.43.233:5000/getVehicleStatus?distressMessage=%20danger%20danger&studentId=3&location=14.4292614,79.9106773&timestamp=2022-03-28T13:00:00.000Z&personname=nikki";
    http.begin(wifiClient, url);
    
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      Serial.print("HTTP response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println("Response payload:");
      Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      Serial.print("Error message: ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }
  
    http.end(); // Close HTTP connection
  }
   delay(5000);
}
  delay(3000);
}