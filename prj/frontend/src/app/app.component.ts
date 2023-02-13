import { Component } from "@angular/core";
import { BackendService } from "../backend/services/backend.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public title = "Stripe POC";

  constructor(private readonly backendService: BackendService) {}

  public async openCustomerPortalApi(): Promise<void> {
    const url = await this.backendService.getCustomerPortal();
    window.open(url, '_blank');
  }
}
