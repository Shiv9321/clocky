import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockBlockComponent } from './clock-block/clock-block.component';
import { ButtonsBlockComponent } from './buttons-block/buttons-block.component';
import { ClockCircleOuterComponent } from './clock-circle-outer/clock-circle-outer.component';
import { TimeButtonBlockComponent } from './time-button-block/time-button-block.component';
import { StopButtonBlockComponent } from './stop-button-block/stop-button-block.component';
import { AngleHsButtonBlockComponent } from './angle-hs-button-block/angle-hs-button-block.component';
import { AngleHmButtonBlockComponent } from './angle-hm-button-block/angle-hm-button-block.component';
import { AngleMsButtonBlockComponent } from './angle-ms-button-block/angle-ms-button-block.component';
import { AdjustedAnglesBlockComponent } from './adjusted-angles-block/adjusted-angles-block.component';
import { ToTopButtonComponent } from './to-top-button/to-top-button.component';
import { RunningTimeBlockComponent } from './running-time-block/running-time-block.component';
import { GoToSupportBlockComponent } from './go-to-support-block/go-to-support-block.component';
import { ToDownButtonComponent } from './to-down-button/to-down-button.component';
import { ShowAdjustmentInfoBlockComponent } from './show-adjustment-info-block/show-adjustment-info-block.component';
import { ClockInnerCircleComponent } from './clock-inner-circle/clock-inner-circle.component';
import { ClockHandsComponent } from './clock-hands/clock-hands.component';
import { ClockHandsAnglesComponent } from './clock-hands-angles/clock-hands-angles.component';
import { ClockInnerDigitsComponent } from './clock-inner-digits/clock-inner-digits.component';
import { ClockHourHandAngleTextComponent } from './clock-hour-hand-angle-text/clock-hour-hand-angle-text.component';
import { ClockMinuteHandAngleTextComponent } from './clock-minute-hand-angle-text/clock-minute-hand-angle-text.component';
import { ClockSecondHandAngleTextComponent } from './clock-second-hand-angle-text/clock-second-hand-angle-text.component';
import { ClockOuterDigitsComponent } from './clock-outer-digits/clock-outer-digits.component';
import { ClockMinuteHandComponent } from './clock-minute-hand/clock-minute-hand.component';
import { ClockHourHandComponent } from './clock-hour-hand/clock-hour-hand.component';
import { ClockSecondHandComponent } from './clock-second-hand/clock-second-hand.component';
import { ClockReferenceHandComponent } from './clock-reference-hand/clock-reference-hand.component';
import { TimeButtonBComponent } from './time-button-b/time-button-b.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockBlockComponent,
    ButtonsBlockComponent,
    ClockCircleOuterComponent,
    TimeButtonBlockComponent,
    StopButtonBlockComponent,
    AngleHsButtonBlockComponent,
    AngleHmButtonBlockComponent,
    AngleMsButtonBlockComponent,
    AdjustedAnglesBlockComponent,
    ToTopButtonComponent,
    RunningTimeBlockComponent,
    GoToSupportBlockComponent,
    ToDownButtonComponent,
    ShowAdjustmentInfoBlockComponent,
    ClockInnerCircleComponent,
    ClockHandsComponent,
    ClockHandsAnglesComponent,
    ClockInnerDigitsComponent,
    ClockHourHandAngleTextComponent,
    ClockMinuteHandAngleTextComponent,
    ClockSecondHandAngleTextComponent,
    ClockOuterDigitsComponent,
    ClockMinuteHandComponent,
    ClockHourHandComponent,
    ClockSecondHandComponent,
    ClockReferenceHandComponent,
    TimeButtonBComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
