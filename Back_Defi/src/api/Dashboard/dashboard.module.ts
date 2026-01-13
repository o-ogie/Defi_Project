import { Dashboard } from '../../models/dashboard.model';
import { DashboardRepository } from './dashboard.repository';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

const dashboardRepository = new DashboardRepository();
const dashboardService = new DashboardService();
const dashboardController = new DashboardController();

export { dashboardController };
