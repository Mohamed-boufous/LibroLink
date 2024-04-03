<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Models\Report;
use Carbon\Carbon;

class ReportController extends Controller
{

    public function index(Request $request)
    {
       $reports = Report::all();
       foreach ($reports as $report) {
           $comment = Comment::find($report->comment_id);
           if ($comment) {
               $report->comment = $comment->text;
           }
       }
       return $reports;
    }

    public function get_number() {
        $total = Report::count();
        $solved = Report::where('solved', 1)->count();
        $unsolved = $total - $solved;
        return response()->json(['total' => $total, 'solved' => $solved, 'unsolved' => $unsolved]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'comment_id' => 'required',
                'reporter_id' => 'required',
                'reported_id' => 'required',
                'message' => 'required|max:200|string|min:1',
            ]);

            $report = new Report();
            $report->comment_id = $request->comment_id;
            $report->reporter_id = $request->reporter_id;
            $report->reported_id = $request->reported_id;
            $report->message = $request->message;
            $report->reported_at = Carbon::now();

            $report->save();

            return response()->json(['message' => 'Report created successfully', 'report' => $report], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id) {
        $report = Report::find($id);
        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }
        $report->solved = $request->solved;
        $report->save();
        return response()->json(['message' => 'Report updated successfully', 'report' => $report], 200);
    }

    public function delete(Request $request) {
        $ids = $request->ids;
        foreach ($ids as $id) {
            $report = Report::find($id);
            $report->delete();
        }
        return response()->json(['message' => 'Reports deleted successfully'], 200);
    }
}
