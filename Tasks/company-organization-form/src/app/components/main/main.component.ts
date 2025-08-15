import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  orgForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.orgForm = this.fb.group({
      departments: this.fb.array([])
    });

    // Start with one department by default
    this.addDepartment();
  }

  // GETTERS FOR FORM ARRAYS
  
  get departments(): FormArray {
    return this.orgForm.get('departments') as FormArray;
  }

  getTeams(deptIndex: number): FormArray {
    return this.departments.at(deptIndex).get('teams') as FormArray;
  }

  getMembers(deptIndex: number, teamIndex: number): FormArray {
    return this.getTeams(deptIndex).at(teamIndex).get('members') as FormArray;
  }

  //ADD / REMOVE METHODS
  
  addDepartment(): void {
    this.departments.push(this.fb.group({
      name: ['', Validators.required],
      deptCode: ['', Validators.pattern(/^[A-Z]{2,6}$/)],
      hasTeams: [false],
      teams: this.fb.array([])
    }));
  }

  removeDepartment(index: number): void {
    this.departments.removeAt(index);
  }

  addTeam(deptIndex: number): void {
    this.getTeams(deptIndex).push(this.fb.group({
      teamName: ['', Validators.required],
      teamLead: [''],
      addMembers: [false],
      members: this.fb.array([])
    }));
  }

  removeTeam(deptIndex: number, teamIndex: number): void {
    this.getTeams(deptIndex).removeAt(teamIndex);
  }

  addMember(deptIndex: number, teamIndex: number): void {
    const members = this.getMembers(deptIndex, teamIndex);
    if (members.length >= 10) {
      alert('Max 10 members per team.');
      return;
    }
    members.push(this.fb.group({
      fullName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.email]
    }));
  }

  removeMember(deptIndex: number, teamIndex: number, memberIndex: number): void {
    this.getMembers(deptIndex, teamIndex).removeAt(memberIndex);
  }

  //COUNT HELPERS

  getDepartmentTeamsCount(deptIndex: number): number {
    return this.getTeams(deptIndex).length;
  }

  getDepartmentMembersCount(deptIndex: number): number {
    let count = 0;
    this.getTeams(deptIndex).controls.forEach(teamCtrl => {
      const members = teamCtrl.get('members') as FormArray;
      count += members.length;
    });
    return count;
  }

  getTotalDepartments(): number {
    return this.departments.length;
  }

  getTotalTeams(): number {
    let count = 0;
    this.departments.controls.forEach(dept => {
      const teams = dept.get('teams') as FormArray;
      count += teams.length;
    });
    return count;
  }

  getTotalMembers(): number {
    let count = 0;
    this.departments.controls.forEach(dept => {
      const teams = dept.get('teams') as FormArray;
      teams.controls.forEach(team => {
        const members = team.get('members') as FormArray;
        count += members.length;
      });
    });
    return count;
  }

  //SUBMIT FORM
   
  onSubmit(): void {
    if (this.orgForm.valid) {
      const rawData = this.orgForm.value;

      // Clean data before logging
      const cleaned = rawData.departments.map((dept: any) => {
        const deptCopy: any = { ...dept };

        if (!dept.hasTeams) {
          delete deptCopy.teams;
        } else {
          deptCopy.teams = dept.teams.map((team: any) => {
            const teamCopy: any = { ...team };
            if (!team.addMembers) {
              delete teamCopy.members;
            }
            return teamCopy;
          });
        }

        if (!dept.deptCode) delete deptCopy.deptCode;

        return deptCopy;
      });

      console.log('Cleaned Data:', cleaned);
      console.log('Totals:', {
        totalDepartments: this.getTotalDepartments(),
        totalTeams: this.getTotalTeams(),
        totalMembers: this.getTotalMembers()
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
}
