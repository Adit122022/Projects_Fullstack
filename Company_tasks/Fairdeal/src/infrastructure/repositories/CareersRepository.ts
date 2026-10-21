import type { JobPosting } from '@/domain/entities'
import { MOCK_JOBS } from '../mock-data/mockJobs'

export class CareersRepository {
  public static getAllJobs(): JobPosting[] {
    return MOCK_JOBS
  }

  public static getJobById(id: string): JobPosting | undefined {
    return MOCK_JOBS.find((j) => j.id === id)
  }

  public static filterJobs(department: string, searchQuery: string): JobPosting[] {
    let result = [...MOCK_JOBS]

    if (department && department !== 'All') {
      result = result.filter((j) => j.department.toLowerCase() === department.toLowerCase())
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.overview.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      )
    }

    return result
  }

  public static getDepartments(): string[] {
    const set = new Set<string>()
    MOCK_JOBS.forEach((j) => set.add(j.department))
    return ['All', ...Array.from(set)]
  }
}
