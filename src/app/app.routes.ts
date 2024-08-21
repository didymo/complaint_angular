import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.guard';
import { AuthenticateComponent } from './_components/authenticate/authenticate.component';
import { InvestigationListComponent } from './_components/investigation-list/investigation-list.component';
import { ManageInvestigationDetailsComponent } from './_components/manage-investigation-details/manage-investigation-details.component';
import { UpdateInvestegationStepsComponent } from './_components/update-investegation-steps/update-investegation-steps.component';
import { ReportConductComponent } from './_components/report-conduct/report-conduct.component';
import { ReportListComponent } from './_components/report-list/report-list.component';
import { InvestigationStepsStepperComponent } from './investigation-steps-stepper/investigation-steps-stepper.component';
export const appRoutes: Routes = [
  //{ path: '', redirectTo: '/investigation/list', pathMatch: 'full' },
  { path: 'user/login', component: AuthenticateComponent },
  { path: 'investigation/list', component: InvestigationListComponent, canActivate: [AuthGuard] },
  { path: 'investigation/detail/:id', component: ManageInvestigationDetailsComponent , canActivate: [AuthGuard] },
  { path: 'investigation/detail/update/:id', component: UpdateInvestegationStepsComponent, canActivate: [AuthGuard] },
  { path: 'report/list', component: ReportListComponent, canActivate: [AuthGuard] },
  { path: 'report/conduct/:id', component: ReportConductComponent, canActivate: [AuthGuard] },
  { path: 'stepper/steps', component: InvestigationStepsStepperComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/user/login' }
];
