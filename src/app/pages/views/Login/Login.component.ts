import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder)
  router = inject(Router)

  fg = this.fb.group({
    username: ['abbott.linea', [Validators.required]],
    password: ['10073011341N', [Validators.required]],
    remember: [true],
  })

  doSubmit() {
    this.router.navigate(['/dashboard'])
  }
}
