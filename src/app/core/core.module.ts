import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { ApiPersonasService } from "./services/api-personas.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ApiPersonasService,
    ],
})

export class CoreModule {}
