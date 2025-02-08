#include <WiFi.h>
#include <WiFiClient.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

#define SENSOR1  13
#define SENSOR2  14

long currentMillis1 = 0;
long previousMillis1 = 0;
int interval1 = 1000;
float calibrationFactor1 = 6;
volatile byte pulseCount1;
byte pulse1Sec1 = 0;
float flowRate1;
unsigned int flowMilliLitres1;
unsigned long totalMilliLitres1;

void IRAM_ATTR pulseCounter1() {
  pulseCount1++;
}

long currentMillis2 = 0;
long previousMillis2 = 0;
int interval2 = 1000;
float calibrationFactor2 = 6;
volatile byte pulseCount2;
byte pulse1Sec2 = 0;
float flowRate2;
unsigned int flowMilliLitres2;
unsigned long totalMilliLitres2;

void IRAM_ATTR pulseCounter2() {
  pulseCount2++;
}

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR1, INPUT_PULLUP);
  pinMode(SENSOR2, INPUT_PULLUP);
  pinMode(12, OUTPUT);
  
  pulseCount1 = 0;
  flowRate1 = 0.0;
  flowMilliLitres1 = 0;
  totalMilliLitres1 = 0;
  previousMillis1 = 0;
  
  pulseCount2 = 0;
  flowRate2 = 0.0;
  flowMilliLitres2 = 0;
  totalMilliLitres2 = 0;
  previousMillis2 = 0;
  
  attachInterrupt(digitalPinToInterrupt(SENSOR1), pulseCounter1, FALLING);
  attachInterrupt(digitalPinToInterrupt(SENSOR2), pulseCounter2, FALLING);
  
  lcd.init();
  lcd.backlight();
  lcd.setCursor(1, 0);
  lcd.print("IoT Based Water");
  lcd.setCursor(1, 1);
  lcd.print("Leakage monitor");
  delay(2000);
}

void loop() {
  currentMillis1 = millis();
  if (currentMillis1 - previousMillis1 > interval1) {
    pulse1Sec1 = pulseCount1;
    pulseCount1 = 0;
    flowRate1 = ((1000.0 / (millis() - previousMillis1)) * pulse1Sec1) / calibrationFactor1;
    previousMillis1 = millis();
    flowMilliLitres1 = (flowRate1 / 60) * 1000;
    totalMilliLitres1 += flowMilliLitres1;
    
    Serial.print("Flow rate1: ");
    Serial.print(int(flowRate1));  
    Serial.print("mL/S");
    Serial.print("\t");
    lcd.clear();
    lcd.setCursor(1, 0);
    lcd.print("Flow1=");
    lcd.print(int(flowRate1));
    lcd.print(" mL/S");
    
    Serial.print("Volume1: ");
    Serial.print(totalMilliLitres1);
    Serial.print("mL / ");
    Serial.print(totalMilliLitres1 / 1000);
    Serial.println("L");
  }
  
  currentMillis2 = millis();
  if (currentMillis2 - previousMillis2 > interval2) {
    pulse1Sec2 = pulseCount2;
    pulseCount2 = 0;
    flowRate2 = ((1000.0 / (millis() - previousMillis2)) * pulse1Sec2) / calibrationFactor2;
    previousMillis2 = millis();
    flowMilliLitres2 = (flowRate2 / 60) * 1000;
    totalMilliLitres2 += flowMilliLitres2;
    
    Serial.print("Flow rate2: ");
    Serial.print(int(flowRate2));
    Serial.print("mL/S");
    Serial.print("\t");
    lcd.setCursor(1, 1);
    lcd.print("Flow2=");
    lcd.print(int(flowRate2));
    lcd.print(" mL/S");
    
    Serial.print("Volume2: ");
    Serial.print(totalMilliLitres2);
    Serial.print("mL / ");
    Serial.print(totalMilliLitres2 / 1000);
    Serial.println("L");
    Serial.println(" ");
  }
  
  if (flowRate2 < flowRate1 && flowRate2 < 8) {
    lcd.setCursor(1, 0);
    lcd.print("Leakage occurred");
    lcd.setCursor(1, 1);
    lcd.print("Flow 1 to 2 ");
    digitalWrite(12, HIGH);
  } else {
    digitalWrite(12, LOW);
  }
}