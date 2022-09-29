import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { ApiPersonasService } from "./services/api-personas.service";
import { ContextService } from "./services/context.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ApiPersonasService,
        ContextService,
    ],
})

export class CoreModule {}