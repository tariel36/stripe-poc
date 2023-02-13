import { Component } from "@angular/core";
import { BackendService } from "../backend/services/backend.service";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public title = "Stripe POC";

  constructor(private readonly backendService: BackendService) {}

  public openCustomerPortalLazy(): void {
    window.open(environment.customerPortal, '_blank');
  }

  public async openCustomerPortalApi(): Promise<void> {
    const url = await this.backendService.getCustomerPortal();
    window.open(url, '_blank');
  }
}
