import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { CommonsRequestsService } from '../../../shared/requests/commons.requests'

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
  commonService = inject(CommonsRequestsService)

  fg = this.fb.group({
    username: ['abbott.linea', [Validators.required]],
    password: ['10073011341N', [Validators.required]],
    remember: [true],
  })

  get u() {
    return this.fg.controls['username'].value || ''
  }

  get pwd() {
    return this.fg.controls['password'].value || ''
  }

  doSubmit() {
    this.commonService.login(this.u, this.pwd).subscribe(() => {
      this.router.navigate(['/dashboard'])
    })
    //
    this.router.navigate(['/dashboard'])
  }
}
