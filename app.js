const roles={
 "Java Backend":{skills:["Java","SQL","Spring Boot","Git"],gaps:["Spring Boot","REST APIs","Unit Testing"]},
 "Full Stack Development":{skills:["Java","SQL","HTML/CSS","JavaScript","React"],gaps:["React","REST APIs","Authentication"]},
 "Data Analyst":{skills:["Python","SQL","Git"],gaps:["Pandas","Data Visualization","Statistics"]},
 "Frontend Development":{skills:["HTML/CSS","JavaScript","React","Git"],gaps:["React","TypeScript","Responsive UI"]}
};
function selected(){return [...document.querySelectorAll('.skills input:checked')].map(x=>x.value)}
function analyze(){
 const chosen=selected(), interest=document.getElementById('interest').value;
 const scored=Object.entries(roles).map(([name,r])=>{
   const hit=r.skills.filter(s=>chosen.includes(s)).length;
   return {name,score:Math.round(hit/r.skills.length*100),gaps:r.gaps.filter(g=>!chosen.includes(g))};
 }).sort((a,b)=>b.score-a.score);
 const best=scored[0];
 document.getElementById('result').classList.remove('hidden');
 document.getElementById('summary').innerHTML=
 `<p><b>${document.getElementById('name').value||'Candidate'}</b>, your strongest current match is <b>${best.name}</b> with an estimated readiness of <b>${best.score}%</b>.</p>
 <p>This prototype uses transparent skill-overlap scoring; a production version can add an AI/LLM explanation layer.</p>`;
 document.getElementById('roles').innerHTML=scored.slice(0,3).map(r=>
 `<div class="role"><b>${r.name}</b><span class="score">${r.score}% fit</span></div>`).join('');
 document.getElementById('gaps').innerHTML=best.gaps.map((g,i)=>
 `<div class="gap">${g} <span class="priority">${i===0?'High':'Medium'} priority</span></div>`).join('');
 const roadmap=[
   `Strengthen ${best.gaps[0]||'core role skills'} using a small hands-on exercise.`,
   `Build one portfolio project demonstrating ${best.name} skills.`,
   `Practice SQL, DSA and role-specific interview questions.`,
   `Create/update your resume and GitHub project documentation.`,
   `Apply to suitable internships and entry-level roles and track feedback.`
 ];
 document.getElementById('roadmap').innerHTML=roadmap.map(x=>`<li>${x}</li>`).join('');
 document.getElementById('result').scrollIntoView({behavior:'smooth'});
}